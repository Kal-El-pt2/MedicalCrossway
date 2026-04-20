import Image from 'next/image'

export default function School({ size = 48 }: { size?: number }) {
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
        src="/school.png" // Ensure this file exists in your public folder
        alt="School Icon"
        width={size}
        height={size}
        className="schoolImg"   
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}