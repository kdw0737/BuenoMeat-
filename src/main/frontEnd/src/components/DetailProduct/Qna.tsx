import React, { useState } from 'react'
import QnaModal from './QnaModal';

interface QnaProps {
  productId?: any;
}

const Qna = ({
  productId,
}: QnaProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className='px-10'>
      <hr className="my-5" />

      <div className='flex items-center justify-between'>
          <p className="text-2xl font-bold">상품문의</p>
          <button 
              className='w-40 text-white bg-blue-300'
              onClick={() => setModalIsOpen(true)}
          >
              문의 하기
          </button>
      </div>

      <div className="flex flex-col gap-2 my-10">
          <span className="flex">▪ 구매한 상품의 <p className="text-bold">취소/반품은 마이부에노 구매내역에서 신청 가능</p>합니다.</span>
          <span className="flex">▪ 가격, 판매자, 교환/환불 및 배송 등 해당 상품 자체와 관련 없는 문의는 <p className="font-bold">아가리를 닫아주세요.</p></span>
          <p className="font-bold">▪ "해당 상품 자체"와 관계없는 글, 양도, 광고성, 욕설, 비방, 도배 등의 글은 예고 없이 이동, 노출제한, 삭제 등의 조치가 취해질 수 있습니다.</p>
          <p>▪ 공개 게시판이므로 전화번호, 메일 주소 등 고객님의 소중한 개인정보는 절대 남기지 말아주세요.</p>
      </div>

      <hr className="h-[3px] my-5 bg-black" />

      <QnaModal 
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          productId={productId}
      />

    </div>
  )
}

export default Qna