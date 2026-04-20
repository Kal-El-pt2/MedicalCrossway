import Image from 'next/image'
    
export default function Plane({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src="/plane.png"
        alt="Plane Icon"
        width={size}
        height={size}
        className="planeImg"   
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}