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
	
	// token uri mapping. It contain for NFT token Id and token uri contain metadata.
	mapping (uint256 => string) public _tokenURIs;
	
	// top level domain mapping. We are storing whitelist top level domain here. like .tron, .trx etc.
    mapping(uint256 => string) private _tlds;
	
	// top level domain list. We are storing to help frontend to retrieve all supported tlds in one read.
	string[] public tldsList;
	
	string private _nftBaseURI = "";
	
	// Price of domain when domain buy from contract.
	uint256 private _price = 1; // 1 TRX.
	
	constructor() TRC721("TNS", "TNS") {
	
	}
	
	/**
	* @dev this function return all supported top level domain list.
	*/
	function getAllTlds() external view returns (string[] memory) {
		return tldsList;
	}
	
	/**
	* @dev this function is used for NFT transfer to check does sender has approval or owner of NFT.
	*/
    function isApprovedOrOwner(address account, uint256 tokenId) external view returns(bool)  {
        return _isApprovedOrOwner(account, tokenId);
    }
	
	/**
	* @dev This function is to get wallet address against domain. like abc.tron domain owner is xyz wallet address.
	*/
	function getOwner(string memory domain) external view returns (address)  {
		string memory _domain = StringUtil.toLower(domain);
	    uint256 tokenId = uint256(keccak256(abi.encodePacked(_domain)));
        return ownerOf(tokenId);
    }
	
	/**
	* @dev this function is used to check does NFT token exist or not. It helps us to prevent minting duplicate NFT token.
	*/
	function exists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }
	
	/**
	* @dev this function is to get current minting price.
	*/
	function getPrice() public view returns (uint256) {
        return _price;
    }
	
	/**
	* @dev this function is to set minting price and this is callable from owner only.
	*/
	function setPrice(uint256 price) public onlyOwner {
        _price = price;
    }
	
	/**
	* @dev this function is to set top level domain support. like owner can add .tron, .trx etc as whitelist.
	*/
	function setTLD(string memory _tld) public onlyOwner {
		require(isTLD(_tld) == false, "Top level domain already exist");
        uint256 tokenId = genTokenId(_tld);
		_tlds[tokenId] = _tld;
		tldsList.push(_tld);
    }
	
	/**
	* @dev this function is to check does top level domain is supported or not.
	*/
	function isTLD(string memory _tld) public view returns (bool) {
		bool isExist = false;
        uint256 tokenId = genTokenId(_tld);
		if (bytes(_tlds[tokenId]).length != 0){
            isExist = true;
        }
		return isExist;
	}
	
	/**
	* @dev It returns base uri for NFT token.
	*/
	function _baseURI() internal view override returns (string memory) {
        return _nftBaseURI;
    }
	
	/**
	* @dev this function is to set base uri for NFT token.
	*/
    function setBaseURI(string memory _uri) external onlyOwner {
        _nftBaseURI = _uri;
    }
	
	/**
	* @dev this function is to get token uri for NFT token. right now we are returning domain against token id.
	*/
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
	
	/**
	* @dev this function is assisting dapp to check array of domains availiblity.
	*/
	function getDomainsAvailibility(string[] memory domains) external view returns (bool[] memory) {
		bool[] memory domainsAvailibility = new bool[](domains.length);
		for (uint i =0; i < domains.length; i++) {
			uint256 tokenId = genTokenId(domains[i]);
			domainsAvailibility[i] = (!_exists(tokenId));
		}
		return domainsAvailibility;
	}
	
	/**
	* @dev user can buy domain from this function. It will mint NFT token and transfer to user.
	*/
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
