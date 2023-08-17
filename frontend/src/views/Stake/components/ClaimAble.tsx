import ClaimTable from 'components/Table/ClaimTable'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserClaimHistory } from 'contract/contractInteraction'
import { useTronWalletAddress } from '../../../state/user/hooks'
import { ThreeDots } from 'react-loader-spinner'

const ClaimAble = () => {
  const walletAddress = useTronWalletAddress();

  const [claims, setClaims] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const fetch = async () => {
      if (!walletAddress){
        setLoading(false)
        return
      }
      
      const claims = await getUserClaimHistory(walletAddress)
      console.log(claims)
      setClaims(claims)
      setLoading(false)
    }
    fetch()
  }, [walletAddress])


  return (
    <ClaimAbleWrapper>

      {loading ?
      <div className='loader-wrapper'>

      <ThreeDots
        height="50"
        width="50"
        radius="9"
        color=" rgb(56, 136, 255)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          paddingLeft: '10px',
          paddingRight: '15px',
        }}
        visible={true} />
      </div>
        :
        <>


      { claims.length > 0 ? <ClaimTable data={claims} /> :
        <div className='no-claimable'>
          <p>No claimable transactions</p>
        </div>
      }
      </>}

    </ClaimAbleWrapper>
  )
}

export default ClaimAble

const ClaimAbleWrapper = styled.div`
    font-family: 'Roboto', sans-serif;  
    height: 100%;
  .no-claimable {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    height: 100%;

    p {
      font-size: 20px;
      color: #000;
      font-weight: 400;
      margin: 0;
    }
  }

  .loader-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
`;