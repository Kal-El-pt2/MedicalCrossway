import Image from 'next/image'

export default function University({ size = 48 }: { size?: number }){
    return(
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
                src="/University.png"
                alt="University Icon"
                width={size}
                height={size}
                className="universityImg"   
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
    )
}