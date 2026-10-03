// Footer.jsx
import './Footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
            <content className="content">
                <description className="description">
                    <descriptionHeader className="descriptionHeader">
                        <badge className="badge">
                            <text>U</text>
                        </badge>
                        <p>UTD STUDENT GOVERNMENT BUDGET TASKFORCE</p>
                    </descriptionHeader>

                    <descriptionText className="descriptionText">
                        an independent, student-led fiscal analysis body dedicated to transparency, clarity, and institutional accountability. all data published is gathered from official university public records.
                    </descriptionText>
                </description>
            </content>

            <references className="references">

                <documentSections className="documentSections">
                
                    <header>DOCUMENT SECTIONS</header>

                    <section>Executive Summary</section>
                    <section>Operating Revenue Sources</section>
                    <section>Instructional Allocations</section>
                    <section>Historical Adjustments</section>
                    
                </documentSections>

                <resources className="resources">
                
                    <header>RESOURCES</header>

                    <section>Raw Data Repository</section>
                    <section>Senate Archives</section>
                    <section>Public Records Request</section>
                    <section>Submit Feedback</section>
                    
                </resources>

            </references>

        </footer>
    );
}