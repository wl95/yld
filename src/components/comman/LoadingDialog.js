import React, {Component} from 'react'

/**
 * 加载中遮罩动画组件
 */

export default class LoadingDialog extends Component {
    render() {
        console.log("render**************LoadingDialog")
        let Spinner = require('react-spinkit');//导入第三方库
        return (
            <div>
                <div style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000000',
                    opacity: '0.1',
                    top: '0',
                    left: '0'
                }}/>
                <div style={{
                    position: 'fixed',
                    width: '120px',
                    height: '120px',
                    top: '50%',
                    left: '50%',
                    // backgroundColor: '#000000',
                    opacity: '0.7',
                    marginLeft: '-60px',
                    marginTop: '-60px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                }}>
                    <Spinner name="line-spin-fade-loader" color="aqua" fadeIn='none' style={{
                        position: 'fixed', top: '50%', left: '50%',
                        marginLeft: '-5px', marginTop: '-8px'
                    }}/>
                </div>
            </div>
        )
    }
}
