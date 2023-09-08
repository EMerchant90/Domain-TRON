import React from 'react';
import styled from 'styled-components';
import { claimUnstakedTrx } from 'contract/contractInteraction';
import { useTronWalletAddress } from 'state/user/hooks';
import { useCountDown } from 'hooks/useCountDown';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';



const ClaimTable = ({ data }) => {

  const walletAddress = useTronWalletAddress();

  const claimHandler = async (index) => {
    try{

      const result = await claimUnstakedTrx(walletAddress, index);
      console.log(result)
      const explorerLink = `https://nile.tronscan.org/#/transaction/${result}`
      sweetAlertService.showSuccessAlert('Success', "You succesfully claimed your TRX", explorerLink);    
    }catch(error:any){
      const errorMessage = error.message ? error.message : 'Transaction failed';
      sweetAlertService.showErrorAlert('Error', errorMessage);    }
  }

  const HandleCountDown1 = ({item, index}) => {
    const { counter, isEnded } = useCountDown({ targetTimestamp: item['claimTime'].toNumber() });

    return (
      <tr key={index}>
      <td>{index + 1}</td>
      <td>{`${item['tronAmount'].toNumber()} TRX`}</td>
      <td>
        <div className='countdown-date'>
           {!isEnded ? counter : "Available"}
      </div>
      </td>
      <td>
        {item['claimed'] === false ? "Not Claimed" : "Claimed"}
      </td>
      <td>
      {!item['claimed']  && <button disabled={!isEnded} onClick={() => claimHandler((index))}>Claim</button>}
         {item['claimed'] && <button disabled={item['claimed']} >Claimed</button>}

      </td>
    </tr>
    )
  }
  return (
    <TableWrapper>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction Amount</th>
            <th>Date to Claim</th>
            <th>Claim Status</th>
            <th>Claimable</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
              <HandleCountDown1 key={index} item={item} index={index} />
          ))}
        </tbody>
      </table>
    </TableWrapper>

  );
};

export default ClaimTable;

const TableWrapper = styled.div`

  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
    border: 1px solid #ddd;
    margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 16px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #333;
    }

    td {
      font-size: 14px;
      line-height: 20px;
      color: #555;
    }

    button{
        width: 100%;
        padding: 10px 10px;
        border-radius: 8px;
        border:none;
        background: rgba(56, 136, 255, 1) ;
        color:#fff;
        font-weight: 500;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
     button:hover{
        background: rgba(56, 136, 255, 0.3) ;
        color: #5a5a5a
      }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
  .countdown-date{
    line-height: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #555;
  }
`;