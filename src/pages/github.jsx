import './github.css'
import { useState } from 'react'
import './media.css'
import { connectApi } from '../API/api'


export function Github() {
    let [searchProfile, SetsearchProfile] = useState("")
    let [keepdata, setkeepdata] = useState(null)
    let [load, setLoad] = useState(false)

    function searchProfileGit(event) {
        let simpandata = event.target.value
        SetsearchProfile(simpandata)
    }

    async function goSearch() {
        if (searchProfile === "") {
            alert("Please Search Anything")
        } else {
            setLoad(true)
            let response = await connectApi(searchProfile)
            setkeepdata(response)
            setLoad(false)
        }

    }

    function ClearHistory() {
        SetsearchProfile("")
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            goSearch()
        }
    }


    return (
        <div className="container">

            <div className='top'>
                <input onKeyDown={handleKeyDown} value={searchProfile} onChange={searchProfileGit} className='textInput' type='text' placeholder='Search Github Profile'></input>
                <button onClick={goSearch} className='search'>Search</button>
                <button onClick={ClearHistory} className='search'>Clear</button>
            </div>
            {keepdata === null && <div className='bottom'>
                <div className='userInfo'>
                    <div className="profileImage">
                        <img className='pp' src="c/image/anonymity.png" alt='profile picture'></img>
                    </div>
                    <div className='middle'>
                        <p className='p1'>??</p>
                        <p className='p4'>@??</p>
                        <p className='p2'>??</p>
                    </div>
                    <div className='right'>
                        <p className='p2'>Join : ??</p>
                    </div>
                </div>
                <div className='Stats'>
                    <div className='repo'>
                        <p className='p5'>Repo</p>
                        <p className='p5'>??</p>
                    </div>

                    <div className='repo'>
                        <p className='p5'>Followers</p>
                        <p className='p5'>??</p>
                    </div>

                    <div className='repo'>
                        <p className='p5'>Following</p>
                        <p className='p5'>??</p>
                    </div>
                </div>
                <div className='Join'>

                    <div className='joinjoin'>
                        <img className='joinImage' src='/image/placeholder.png'></img>
                        <p className='p4'>??</p>
                    </div>



                    <div className='joinjoin'>
                        <img className='joinImage' src='/image/gmail.png'></img>
                        <p className='p4'>??</p>
                    </div>
                    <div className='joinjoin'>
                        <img className='joinImage' src='/image/link.png'></img>
                        <p className='p4'>??</p>
                    </div>


                </div>
            </div>}
            
            {load === true && <p>Loading...</p>}

            {(load === false) && (keepdata !== null) &&
                <div className='bottom'>
                    <div className='userInfo'>
                        <div className="profileImage">
                            <img className='pp' src={keepdata.avatar_url} alt='profile picture'></img>
                        </div>
                        <div className='middle'>
                            <p className='p1'>{keepdata.login}</p>
                            <a className='p4' href={keepdata.html_url} target='_blank'>
                                <p className='p4'>@{keepdata.login}</p>
                            </a>
                            <p className='p2'>{keepdata.bio}</p>
                        </div>
                        <div className='right'>
                            <p className='p2'>Join : {keepdata.created_at}</p>
                        </div>
                    </div>
                    <div className='Stats'>
                        <div className='repo'>
                            <p className='p5'>Repo</p>
                            <p className='p5'>{keepdata.public_repos}</p>
                        </div>

                        <div className='repo'>
                            <p className='p5'>Followers</p>
                            <p className='p5'>{keepdata.followers}</p>
                        </div>

                        <div className='repo'>
                            <p className='p5'>Following</p>
                            <p className='p5'>{keepdata.following}</p>
                        </div>
                    </div>
                    <div className='Join'>
                        {keepdata.location === null &&
                            <div className='joinjoin'>
                                <img className='joinImage' src='/image/placeholder.png'></img>
                                <p className='p4'>Not Update</p>
                            </div>
                        }

                        {keepdata.location !== null &&
                            <div className='joinjoin'>
                                <img className='joinImage' src='/image/placeholder.png'></img>
                                <p className='p4'>{keepdata.location}</p>
                            </div>
                        }


                        {keepdata.email === null &&
                            <div className='joinjoin'>
                                <img className='joinImage' src='/image/gmail.png'></img>
                                <p className='p4'>Not Update</p>
                            </div>
                        }
                        {keepdata.email !== null &&
                            <a href={keepdata.email}>
                                <div className='joinjoin'>
                                    <img className='joinImage' src='/image/gmail.png'></img>
                                    <p className='p4'>{keepdata.email}</p>
                                </div>
                            </a>
                        }

                        {keepdata.blog === null &&
                            <div className='joinjoin'>
                                <img className='joinImage' src='/image/link.png'></img>
                                <p className='p4'>Not Update</p>
                            </div>
                        }

                        {keepdata.blog !== null &&
                            <a className='p4' href={keepdata.blog}>
                                <div className='joinjoin'>
                                    <img className='joinImage' src='/image/link.png'></img>
                                    <p className='p4'>{keepdata.blog}</p>
                                </div>
                            </a>
                        }


                    </div>
                </div>
        }
        </div>
    )
}