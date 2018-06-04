const Card = Reactstrap.Card;
const CardImg = Reactstrap.CardImg;
const CardText = Reactstrap.CardText;
const CardBody = Reactstrap.CardBody;
const CardTitle = Reactstrap.CardTitle
const CardSubtitle = Reactstrap.CardSubtitle;
const Button = Reactstrap.Button;
const Input = Reactstrap.Input;
const Form = Reactstrap.Form;
const FormGroup = Reactstrap.FormGroup;

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    login(){
        fetch("datos.php/User",{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              method: 'get',
              userName: this.props.userName,
              password: this.props.password
            })
          }).then((response) => {return response.json()})
          .then((data) => {
            if(data){
              this.props.login(true);
              this.props.changeView('sucursales');
            }
           })
    }

    signIn(){
      this.props.changeView('signIn');
    }

    render() {
        return (
          <div align="center" style={{margin:"10%"}}>
          <Card style={{width:"40%", height:"50%"}}>
            <CardBody>
              <CardTitle>Login</CardTitle>
              <Form>
                <FormGroup>     
                  <Input type="text" name="userName" placeholder="User Name" onChange={this.props.handleFields}></Input>
                </FormGroup>
                <FormGroup> 
                  <Input type="text" name="password" placeholder="Password" onChange={this.props.handleFields}></Input>
                </FormGroup>
                <FormGroup> 
                  <Button style={{width:"100%", background: "#60c7c1"}} onClick={this.login}>Login</Button>
                </FormGroup>
                <FormGroup> 
                  <Button style={{width:"100%"}} onClick={this.signIn}>Sign In</Button>
                </FormGroup> 
              </Form>  
            </CardBody>
          </Card>
        </div>   
      )
    }
}
