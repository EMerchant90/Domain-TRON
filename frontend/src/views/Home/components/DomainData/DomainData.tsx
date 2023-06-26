import { RedCheckIcon } from "components/Icons";
import styled from "styled-components";

const DomainDataWrapper = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
    justify-content : center;
    background-color : #fff;
    padding : 30px;
    fons-size : 16px;
    font-family : 'Roboto', sans-serif;
    align-items : center;
    border-radius : 6px;
    margin-bottom : 30px;
    
    & .domain-name-box{
        display : flex;
        flex-direction : row;
    }

    & .domain-name{
        margin:7px;
        padding: 17px;
        border: 1px solid #DDD;
        border-radius: 10px;
        tee-align: center;
        color: #ff0003 ;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        & p{
            margin : 0;
            text-align : center;
        }
    }

    & .domain-fields{
        display : flex;
        flex-direction : row;
        justify-content : space-between;
        width : 50%;
        font-family : 'Roboto', sans-serif;
        padding-bottom : 15px;
    }

    & .domain-key{
        font-family : 'Roboto', sans-serif;
        font-size : 16px;
        font-weight : 300;
        margin:0;
        }
    & .domain-value{
        font-family : 'Roboto', sans-serif;
        font-size : 16px;
        font-weight : bold;
        margin:0;

    }

    & .domains-detail{
        display : flex;
        width : 100%;
        flex-direction : column;
        justify-content : center;
        align-items : center;
        padding : 15px;

        & p{
            font-family : 'Roboto', sans-serif;
            font-size : 20px;
            font-weight : bold;
            margin:0 0 10px 0;

        }
    }

    & .mint-button{
        width : 100%;
        padding : 15px;
        background-color: #ff0003;
        border-radius: 10px;
        border: none;
        color: #fff;
        font-family : 'Roboto', sans-serif;
        font-size: 17px;
        cursor: pointer;
    }


`

const DomainData  =()=>{

const domaindata = [{
    name : "ABX.trx",
    checked : true,
},
{
    name : "ABX.trx",
    checked : true,
},
{
    name : "ABX.trx",
    checked : true,
}]

const domainFieldsData = [{
    key : "2 Characters",
    value : "40000TRX",
},
{
    key : "2 Characters",
    value : "40000TRX",
},{
    key : "2 Characters",
    value : "40000TRX",
},{
    key : "2 Characters",
    value : "40000TRX",
},]


    return (
    <DomainDataWrapper>
        <div className="domain-name-box">
            {
                domaindata.map((item,index)=>(
                    <div className="domain-name">
                            <p>
                                {item.name}
                            </p>
                           {item.checked ? <RedCheckIcon/> : null}
                    </div>
            ))
            }
        </div>
            {
                domainFieldsData.map((item,index)=>(
                    <div className="domain-fields">
                    <p className="domain-key">
                        {item.key}
                    </p>
            
                    <p className="domain-value">
                        {item.value}
                    </p>
                </div>
                ))
            }

            <div className="domains-detail">
                <p >Your domain: Domain name</p>
                <p >60000 TRX</p>
            </div>

            <button className="mint-button">
                Mint Now
            </button>


    </DomainDataWrapper>)

}

export default DomainData;