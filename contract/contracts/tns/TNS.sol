//SPDX-License-Identifier:MIT

pragma solidity ^0.8.18;

import {TRC721} from "./TRC721.sol";
import {ITRC721} from "./interfaces/ITRC721.sol";
import {TRC721Enumerable} from "./TRC721Enumerable.sol";
import {SafeMath} from "./libraries/SafeMath.sol";
import {StringUtil} from "./libraries/StringUtil.sol";
import "./Ownable.sol";


contract TNS is TRC721Enumerable, Ownable
{
	using SafeMath for uint256;
	
	event NewURI(uint256 indexed tokenId, string tokenUri);
	
	mapping (uint256 => string) public _tokenURIs;
	
    mapping(uint256 => string) private _tlds;
	
	string[] public tldsList;
	
	string private _nftBaseURI = "";
	
	uint256 private _price = 1;
	
    modifier onlyApprovedOrOwner(uint256 tokenId) {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId)
        );
        _;
    }
	
	constructor() TRC721("TNS", "TNS") {
	
	}
	
	function getAllTlds() external view returns (string[] memory) {
		return tldsList;
	}
	
    function isApprovedOrOwner(address account, uint256 tokenId) external view returns(bool)  {
        return _isApprovedOrOwner(account, tokenId);
    }
	
	
	function getOwner(string memory domain) external view returns (address)  {
		string memory _domain = StringUtil.toLower(domain);
	    uint256 tokenId = uint256(keccak256(abi.encodePacked(_domain)));
        return ownerOf(tokenId);
    }
		
	function exists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }


	function getPrice() public view returns (uint256) {
        return _price;
    }
	
	function setPrice(uint256 price) public onlyOwner {
        _price = price;
    }
	
	function setTLD(string memory _tld) public onlyOwner {
		require(isTLD(_tld) == false, "Top level domain already exist");
        uint256 tokenId = genTokenId(_tld);
		_tlds[tokenId] = _tld;
		tldsList.push(_tld);
    }
	
	function isTLD(string memory _tld) public view returns (bool) {
		bool isExist = false;
        uint256 tokenId = genTokenId(_tld);
		if (bytes(_tlds[tokenId]).length != 0){
            isExist = true;
        }
		return isExist;
	}
	
	function _baseURI() internal view override returns (string memory) {
        return _nftBaseURI;
    }
    
    function setBaseURI(string memory _uri) external onlyOwner {
        _nftBaseURI = _uri;
    }
	
	function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "TRC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];

        // If there is no base URI, return the token URI.
		string memory baseURI = _baseURI();
        if (bytes(baseURI).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(baseURI, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(baseURI, tokenId));
    }

	function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "TRC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
	
	function getDomainsAvailibility(string[] memory domains) external view returns (bool[] memory) {
		bool[] memory domainsAvailibility = new bool[](domains.length);
		for (uint i =0; i < domains.length; i++) {
			uint256 tokenId = genTokenId(domains[i]);
			domainsAvailibility[i] = (!_exists(tokenId));
		}
		return domainsAvailibility;
	}
	function buyDomain(string memory domain, string memory tld) external payable
	{
	
//		require(msg.value >= _price, "Insufficient Token or Token value sent is not correct");
		
		require(isTLD(tld) == true, "Top level domain not exist");
		
		uint256 _length = bytes(domain).length;

		require(_length > 0, "Domain must be non-empty");

		
		string memory _domain = StringUtil.toLower(domain);

		string memory _tld = StringUtil.toLower(tld);
		
		_domain = string(abi.encodePacked(_domain, ".", _tld));

		uint256 tokenId = genTokenId(_domain);

		require (!_exists(tokenId), "Domain already exists");

	   _safeMint(msg.sender, tokenId);

	   _setTokenURI(tokenId, _domain);

	   emit NewURI(tokenId, _domain);
    }
	
	/**
     * Begin: System
     */
	function genTokenId(string memory label) public pure returns(uint256)  {
        require (bytes(label).length != 0);
        return uint256(keccak256(abi.encodePacked(label)));
    }

    
	function withdraw() external payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
	
	/**
     * End: System
     */
}
