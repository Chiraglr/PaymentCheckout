import styles from './CardPrimary.module.scss';

function CardPrimary(props){
    return <div className={`${props.className} ${props.noShadow ? '' : styles.card} rounded-sm p-3`}
        onClick={props.onClick}
    >
        {props.children}
    </div>
}

export default CardPrimary;
