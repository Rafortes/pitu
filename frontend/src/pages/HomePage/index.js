import React from 'react';
import Header from '../../components/Header';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import { ContentContainer, Form } from './style';
import ShortenerService from '../../services/shortenerService';
import vars from '../../configs/vars';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMenssage: '',
        }
       
    }

    handleSubmit = async(event) => {
        
        event.preventDefault();

        var { url } = this.state;
        
        if(url.indexOf('https://') < 0 && url.indexOf('http://') < 0)
            url = `http://${url}`;
        
        this.setState({ isLoading: true, errorMenssage: '' });
        
        if(!url)
            this.setState({ isLoading: false, errorMenssage: 'Informe uma URL' });
        else{
            try {
                const service = new ShortenerService();
                const result = await service.gerenate({ url });
                
                this.setState({ isLoading: false, code: result.code });
            } catch (error) {
                this.setState({ isLoading: false, errorMenssage: 'Ops, erro' });
            }
        }
    }

    copyToClipboard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    }

    render() {
        const { isLoading, errorMenssage, code } = this.state;
        return (
            <Container>
                <Header>Seu novo encurtador URL</Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                            <FormControl 
                                placeholder="Digite a URL"
                                defaultValue=""
                                onChange={e => this.setState({ url: e.target.value })}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                            code && (
                                <>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            autoFocus ={true}
                                            defaultValue={vars.HOST_API + code}
                                            ref={(input) => this.inputURL = input}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}>Copiar</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <p>Para acompanhar os status, acesse {vars.HOST_API + code}/stats</p>
                                </>
                            )
                        )}
                        {errorMenssage && <Alert variant="danger">{errorMenssage}</Alert>}
                    </Form>
                </ContentContainer>
            </Container>
        );
    }
}

export default HomePage;