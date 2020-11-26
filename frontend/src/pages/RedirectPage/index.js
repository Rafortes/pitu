import React from 'react';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { StatsContainer } from './style';

class RedirectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            errorMenssage: '',
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params;

        try {
            const service = new ShortenerService();
            const { url } = await service.getLink(code);
            
            window.location = url;
        } catch (error) {
            this.setState({ isLoading: false, errorMenssage: 'Ops, redirecionamento não dá'});
        }
    }

    render() {
        const { errorMenssage } = this.state;
        return (
            <Container>
                {errorMenssage ? (
                    <>
                        <Header>Redirecionando...</Header>
                        <StatsContainer className="text-center">
                            <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                            <p className="m-3">{errorMenssage}</p>
                            <a className="btn btn-primary" href="/">Encurtar nova url</a>
                        </StatsContainer>
                    </>
                ) : (
                    <p className="text-center" >Redirecionando...</p>
                )}
            </Container>
        )
    }
}

export default RedirectPage;