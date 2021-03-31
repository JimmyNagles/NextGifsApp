import React from 'react'
import Link from "next/link"



function Footer() {
    return (
        <div>
                <div className="footer">
                <p><Link href="/"><a>home</a></Link></p>
                <p><Link href="/about"><a>about</a></Link></p>
                <p>A big thanks to <a href="https://giphy.com/">giphy.com</a> for letting us use there API!</p>
            </div>
        </div>
    )
}

export default Footer
