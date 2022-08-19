import styles from './styles.module.scss';
export default function Avatar({ alt, src, text, withText }) {
    return (
        <div>
            <img className={styles.avatar} alt={alt} src={src} title={alt} />
            {withText && <strong>{text || alt}</strong>}
        </div>
    )
}