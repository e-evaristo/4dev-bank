import homeImg from '../../src/img/home-img.png';

import './pages.css';

const Home = () => {

    return ( 
        <section className='home-container'>
            <h1>Bem-vindo(a) ao <span>4DevBank</span></h1>
            <p>Comece a investir agora mesmo!</p>
            
            <img src={homeImg} alt="home-img" />
        </section>
     );
}
 
export default Home;