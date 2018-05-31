import React, {Component} from 'react'
import '../Statics/css/Header.css'
import {MdMenu} from 'react-icons/lib/md'
import api from '../Models/Api'

export default class Header extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            AcountStatus: {}
        }
    }

    async componentDidMount(){
        let available_books = await api.get('available_books/')
        console.log(available_books)
    }

    render(){
        return(
            <div className='Header' >
                <MdMenu className='menuIcon' />
                <h2 className='logo' >Menu</h2>
            </div>
        )
    }
}
