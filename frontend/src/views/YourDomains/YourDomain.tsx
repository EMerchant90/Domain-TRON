import React from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

const YourDomainsPage =  () => {
    const [loading, setLoding] = useState(false);

    const data = [
        {
            domain: "test",
            price: "1000",
            available: true,
        },
        {
            domain: "test",
            price: "1000",
            available:false,
        },
        {
            domain: "test",
            price: "1000",
            available: true,
        },
        {
            domain: "test",
            price: "1000",
            available: true,
        },
        
    ]

    return (
        <DomainsWrapper>

            <div className="domains-container">
                <h1>Your Domains: data.length</h1>
                <div className="divider" />
                <div className="refresh-button-box">
                    <button>
                        Refresh
                    </button>
                </div>

               {loading && <ThreeDots
                    height="50"
                    width="50"
                    radius="9"
                    color=" rgb(56, 136, 255)"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                        paddingLeft: '10px',
                        paddingRight: '15px',
                    }}
                    visible={true} />}
                    
                    <div className="domain-cards-box">

                    {!loading &&  <>{data.map((item, index) => {
                        return (
                            <div key={index} className="domain-card">
                                    <p className="domain-name">{item.domain}</p>
                                    <p className="domain-price">{item.price}</p>
                            </div>
                        )
                    })}

                    </>}
                    </div>



                <div className="divider" />


            </div>

        </DomainsWrapper>
    )
}


export default YourDomainsPage;


const DomainsWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fff;
    border-radius: 10px;
    margin: 30px 0;

    & .domains-container{
        padding: 0 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        
        h1{
            font-size: 24px;
            font-weight: 800;
            color: #506690;
            margin: 20px 0;
            font-family: 'Roboto', sans-serif;
        }

        & .divider{
            width: 100%;
            height: 1px;
            background-color: #DDD;

        }
    }


    & .refresh-button-box{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        button{
            background-color: #fff;
            border: 1px solid rgb(56, 136, 255);
            padding: 4px 8px;
            color: rgb(56, 136, 255);
            border-radius: 5px;
            margin: 10px 0;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Roboto', sans-serif;
        }
    }

    & .domain-cards-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-Width: 500px;
    }
    & .domain-card{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        BORDER: 1PX SOLID #DDD;
        border-radius: 16px;
        margin: 10px 0;
        padding: 8px 16px;

        & .domain-name{
            font-size: 16px;
            font-weight: 600;
            font-family: 'Roboto', sans-serif;
        }
        & .domain-price{
            font-size: 16px;
            font-weight: 400;
            font-family: 'Roboto', sans-serif;
         
        }
    }
 

`