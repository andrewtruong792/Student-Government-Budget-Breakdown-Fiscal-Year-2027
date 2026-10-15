// Home.jsx
import './Home.css'
import bg from "../assets/campusBG.png";
import logo from "../assets/squareSGlogo.png";


export default function Home() {
    return (
        <>
        <section className='hero'>
        
            <img
                    className="campus-background"
                    src={bg}
                    alt="Campus Background"
            />     
        <div className='overlay-content'>
            <div>
            <div className='text'>
                <h1 className='title'>UT Dallas <br />Budget Breakdown</h1>
                <p className='body'>We make university budget documents easier to understand through 
                    clear interactions and interactive visuals, built by students for a informed UTD community.</p>
            </div>
            <div className='button-row'>
                <a className='reports' href='/report-overview'>Explore the Reports ➜</a>
                <a className='about-us' href='/about-us'>About Us</a>
            </div>
            </div>
            <img className="biglogo" src={logo} alt="biglogo"/>
        </div>
        </section>
        
        <section className='arrow-section'>
            <button className='arrow-button'><span className='arrow-text'>➜</span></button>
        </section>
        
        <section className='explore-the-budget'>
            <a className='title-wrapper'><span className='title'>Explore the Budget</span></a>
            <div className='module-section'>
                <button className='module revenue-card'>
                    <a className='module-title'>Revenue</a>
                    <a className='module-body'>See where the university funding comes from, including tuition, state appropriations, and other sources.</a>
                    <a className='module-view-analysis' href='/revenue'>view analysis ➜</a>
                </button>
                <button className='module expenses-card'>
                    <a className='module-title'>Expenses</a>
                    <a className='module-body'>Explore how funds are spent across <br /> instruction, research, student services, and more.</a>
                    <a className='module-view-analysis' href='/expenses'>view analysis ➜</a>
                </button>
                <button className='module budget-trends-card'>
                    <a className='module-title'>Budget Trends</a>
                    <a className='module-body'>See how the university's finances have changed over time, with key metrics and comparisons.</a>
                    <a className='module-view-analysis' href='/budget-trends'>view analysis ➜</a>
                </button>
            </div>
        </section>

        <div className='divider-wrapper'><div className='divider'></div></div>

        <section className='why-this-matters'>
            <a className='title-wrapper'><span className='title'>Why This Matters</span></a>
            <a className='body-wrapper'><a className='body'>University budgets affect everything from tuition costs and campus <br />resources to the student experience. We believe this information should <br />be accessible and understandable to everyone in the UTD community.</a></a>
        </section>

        </>
    );
}