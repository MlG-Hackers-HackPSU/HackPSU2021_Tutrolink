import styles from './Footer.module.css';
import github from '../images/github.svg';

function Footer() {
    return (
        <footer class={styles.footer}>
            <aside class={styles.project}>
                <span> Made for <a class={styles.hackpsu} href="https://hackpsu.org">HackPSU</a> Spring 2021 </span>
            </aside>
            <aside class={styles.project}>
                Check out the Source Code on &nbsp;
                <span>
                <a href="https://github.com/MlG-Hackers-HackPSU/HackPSU2021_Tutrolink">
                    <img class={styles.icon} src={github} alt="project repository"></img>
                </a>
                </span>
            </aside>
        </footer>
    )
}

export default Footer