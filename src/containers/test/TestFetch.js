import React, {Component} from 'react'
import fetch from "isomorphic-fetch";

export default class TestFetch extends Component {
    constructor(props) {
        super(props)
    }
    test=()=>{

        fetch('https://www.baidu.com/',
            {
                method: 'GET',// *GET, POST, PUT, DELETE
                mode: 'no-cors',// no-cors, cors, *same-origin
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
                // body: body
        }
        ).then(res => { console.log("status"+res.status);   return {"error":"0"} })
            .then(json => {

            })
            .catch(error => {
                console.log("error======"+error)

            });//如果网络异常，走这里，提示错误信息

    }

    render() {

        console.log("render**************Login")

        return (
            <div style={{paddingTop: "200px"}} onClick={this.test}>
                123123132
            </div>
        )
    }

}