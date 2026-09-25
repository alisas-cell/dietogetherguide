import Image from 'next/image';
import Link from 'next/link';

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Die Together Wiki home">
      <Image
        src="/brand/field-guide-mark.svg"
        alt=""
        width={46}
        height={46}
        priority
      />
      <span className="brand-copy">
        <span>Last Pirates</span>
        <strong>Die Together Wiki</strong>
        <span>Independent field guide</span>
      </span>
    </Link>
  );
}
