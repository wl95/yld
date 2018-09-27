import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { Alert,UncontrolledAlert,
    Badge,
    Button,ButtonGroup,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Input,
    Table,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';



/**
 * 容器
 */

class BootstrapPage extends Component {
    constructor(props) {
        super(props)
        // !this.props.liveScoresData && this.props.fetchDataCallback(this.getparams(), (json) => this.props.initData(json.liveScores))//请求数据

        this.state = {  cSelected: [] ,
                        dropdownOpen: false
        };

    }

    onRadioBtnClick=(rSelected) => {
        this.setState({ rSelected });
    }

    onCheckboxBtnClick=(selected) => {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] });
    }

    toggle=() => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }


    componentWillMount() {

    }

    componentWillUnmount(){

    }



    render() {

        console.log("render**************BootstrapPage")

        if(true){
            return (
                <div>
                    <h1>Welcome <Badge color="secondary">Report</Badge></h1>
                </div>
            )
        }

        return (
                <div>

                    <Alert color="primary">
                        This is a primary alert — check it out!
                    </Alert>
                    <Alert color="primary">
                        This is a primary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                    </Alert>
                    <Alert color="success">
                        <h4 className="alert-heading">Well done!</h4>
                        <p>
                            Aww yeah, you successfully read this important alert message. This example text is going
                            to run a bit longer so that you can see how spacing within an alert works with this kind
                            of content.
                        </p>
                        <hr />
                        <p className="mb-0">
                            Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                        </p>
                    </Alert>
                    <Alert color="info" isOpen={true} toggle={()=>{}}>
                        I am an alert and I can be dismissed!
                    </Alert>
                    <UncontrolledAlert color="info">
                        I am an alert and I can be dismissed!
                    </UncontrolledAlert>


                    <h1>Heading <Badge color="secondary">New</Badge></h1>
                    <h2>Heading <Badge color="secondary">New</Badge></h2>
                    <h3>Heading <Badge color="secondary">New</Badge></h3>
                    <h4>Heading <Badge color="secondary">New</Badge></h4>
                    <h5>Heading <Badge color="secondary">New</Badge></h5>
                    <h6>Heading <Badge color="secondary">New</Badge></h6>

                    <Button color="primary" outline>
                        Notifications <Badge color="secondary">4</Badge>
                    </Button>

                    <Badge color="primary">Primary</Badge>
                    <Badge color="secondary">Secondary</Badge>
                    <Badge color="success">Success</Badge>
                    <Badge color="danger">Danger</Badge>
                    <Badge color="warning">Warning</Badge>
                    <Badge color="info">Info</Badge>
                    <Badge color="light">Light</Badge>
                    <Badge color="dark">Dark</Badge>

                    <Badge color="primary" pill>Primary</Badge>
                    <Badge color="secondary" pill>Secondary</Badge>
                    <Badge color="success" pill>Success</Badge>
                    <Badge color="danger" pill>Danger</Badge>
                    <Badge color="warning" pill>Warning</Badge>
                    <Badge color="info" pill>Info</Badge>
                    <Badge color="light" pill>Light</Badge>
                    <Badge color="dark" pill>Dark</Badge>

                    <Badge href="#" color="primary">Primary</Badge>
                    <Badge href="#" color="secondary">Secondary</Badge>
                    <Badge href="#" color="success">Success</Badge>
                    <Badge href="#" color="danger">Danger</Badge>
                    <Badge href="#" color="warning">Warning</Badge>
                    <Badge href="#" color="info">Info</Badge>
                    <Badge href="#" color="light">Light</Badge>
                    <Badge href="#" color="dark">Dark</Badge>


                    <h5>Radio Buttons</h5>
                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>One</Button>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Two</Button>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Three</Button>
                    </ButtonGroup>
                    <p>Selected: {this.state.rSelected}</p>

                    <h5>Checkbox Buttons</h5>
                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}>One</Button>
                        <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>Two</Button>
                        <Button color="primary" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}>Three</Button>
                    </ButtonGroup>
                    <p>Selected: {JSON.stringify(this.state.cSelected)}</p>


                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Button Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>


                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td><Badge href="#" color="secondary">Secondary</Badge></td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Pagination className="float-left">
                        <PaginationItem>
                            <PaginationLink previous href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                4
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                5
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next href="#" />
                        </PaginationItem>
                    </Pagination>


                    <Button color="danger">Danger!</Button>
                    <Input placeholder="username" />

            </div>
        )
    }



}



BootstrapPage.propTypes = {
}

const mapStateToProps = (state) => ({
})


const mapDispatchToProps = (dispatch) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BootstrapPage)