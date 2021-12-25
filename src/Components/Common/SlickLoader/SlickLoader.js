import styles from './SlickLoader.module.scss';

function SlickLoader() {
  return <div className={`animate-slick-loader h-12 w-12 absolute left-1/2 top-1/2 rounded-full h-[50px] w-[50px] border border-grey ${styles["slick-loader"]}`} />;
}

export default SlickLoader;