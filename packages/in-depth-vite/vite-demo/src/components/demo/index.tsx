import styles from './index.module.scss'
// import img from '@assets/react.svg'
import ReactLogo from '@assets/react.svg?react';
import img from '@assets/img1.png';
const Demo = () => {
  return (
    <div>
      <div className={styles.name}>css module</div>
      <div className="bg-red-400">taiwincsss</div>
      <img src={img} />
      <ReactLogo />
    </div>
  )
}

export default Demo