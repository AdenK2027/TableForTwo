import './App.css'

interface ItemProps {
  rotation: number;
  pinColor: string;
}

function Item({ rotation, pinColor }: ItemProps) {
  return (
    <div
      className="itemFrame"
      style={{
        "--rotation": `${rotation}deg`,
      } as React.CSSProperties}
    >

      <svg
        width="30px"
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          top: "-.5vw",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      >
        <circle cx="12" cy="12" r="8" fill={pinColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <circle cx="9" cy="9" r="2" fill="rgba(255,255,255,0.5)" />
      </svg>

      <svg width="100%" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
        <title>Blank polaroid photo</title>
        <rect x="10" y="10" width="280" height="340" rx="4" fill="#ffffff" stroke="#d8d8d8" strokeWidth="1" />
        <rect x="30" y="30" width="240" height="240" rx="2" fill="#e9ecef" stroke="#d0d3d6" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default Item

