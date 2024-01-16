import React, { useState } from 'react'
import SecondCard from './Second'
import Third from './Third'
import { OrderItemListProps } from '../../../types/Order/OrderItemListProps'
import { OrderMemberInfoProps } from '../../../types/Order/OrderMemberInfoProps';

interface ContentsProps {
  productData: OrderItemListProps[];
  userData: OrderMemberInfoProps;
  postHandler: () => Promise<void>;
}

const Contents = ({
  productData,
  userData,
  postHandler
}: ContentsProps) => {
  const [signal, setSignal] = useState(false);
  
  return (
    <>
      <table className="table-fixed w-full border-separate rounded-[20px] overflow-hidden">
        <thead>
          <tr className="bg-[rgba(0,0,0,0.1)]">
            <th
              scope="col"
              className="hover:bg-[rgba(0,0,0,0.2)] w-3/5"
            >
              상품정보
            </th>
            <th
              scope="col"
              className="hover:bg-[rgba(0,0,0,0.2)]"
            >
              수량
            </th>
            <th
              scope="col"
              className="hover:bg-[rgba(0,0,0,0.2)]"
            >
              적립금
            </th>

            <th
              scope="col"
              className="hover:bg-[rgba(0,0,0,0.2)]"
            >
              주문금액
            </th>
          </tr>
        </thead>

        <tbody>
          {productData.map((product, index) => ( 
            <SecondCard 
              key={index}
              itemId={product.itemId}
              image={product.image}
              itemName={product.itemName}
              totalPrice={product.totalPrice}
              itemCount={product.itemCount}
              itemOption={product.itemOption}
              stock={product.stock}
              maxPoint={userData.point}
              itemUsePoint={product.itemUsePoint}  // 각 아이템에서 사용할 usePoint, default로는 숫자 0
              setItemUsePoint={(point: any) => product.itemUsePoint = point}
            />
            ))}
          </tbody>
          {!signal && <div className='flex items-center justify-center w-full gap-10 my-12'>
            <p className='text-3xl font-bold w-[600px]'>모든 상품에 대한 적립금을 모두 입력하셨나요 ?</p>
            <button 
              className='w-20'
              onClick={() => setSignal(true)}
            >
              예
            </button>
          </div>}
        </table>


        {signal && <>
          <div className="mb-16" />
          <p className="text-2xl font-bold">최종 결제 금액</p>
          <Third 
              point={userData.point}
              productData={productData}
          /> 
          <div className="mb-10" />

            <div className="flex items-center justify-center my-16">
              <button 
                className="w-40 text-white bg-blue-400"
                onClick={() => postHandler()}
              >
                {productData.map((data) => data.totalPrice - Number(data.itemUsePoint)).reduce((a,b) => a + b)}원 결제하기
              </button>
            </div>
            </>
        }
      </>
  )
}

export default Contents