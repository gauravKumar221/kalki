import React from 'react'

const StoreCookie = () => {
  return (
    <div>
        <div id="gdpr"
  className="bg-white fixed z-50 p-2 rounded-full drop-shadow-2xl bottom-12 left-1/2 -translate-x-1/2 max-sm:w-11/12">
  <div className="flex items-center justify-between gap-6 text-sm">
    <div className="content-left pl-4">
      This website uses cookies to improve your web experience.
    </div>
    <div className="content-right text-end">
      <button className="bg-black text-white px-4 py-2 cursor-pointer rounded-full">Accept</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default StoreCookie