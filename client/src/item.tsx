function Item() {

  return (
    <div className="itemFrame">
        <div style={{ width: "100%", maxWidth: "200px" }}>
            <svg width="100%" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
                <title>Blank polaroid photo</title>
                <rect x="10" y="10" width="280" height="340" rx="4" fill="#ffffff" stroke="#d8d8d8" strokeWidth="1" />
                <rect x="30" y="30" width="240" height="240" rx="2" fill="#e9ecef" stroke="#d0d3d6" strokeWidth="1" />
            </svg>
        </div>
    </div>
  )
}

export default Item

