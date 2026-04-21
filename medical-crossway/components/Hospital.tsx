import Image from 'next/image'

export default function Hospital({ size = 90 }: { size?: number }) {
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
        src="/hospital.png"
        alt="Hospital Icon"
        width={size}
        height={size}
        className="hospitalImg"   
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}