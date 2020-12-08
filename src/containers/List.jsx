import React, { Fragment } from "react";

import Card from "./../components/Card/Card";

console.log(process.env.REACT_APP_API);

const API = process.env.REACT_APP_API;

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],
            serchTerm: "kimetsu",
            error : "",
            loading: true,
        };
    }

    async componentDidMount() {
        const res = await fetch(`${API}&s=${this.state.serchTerm}`);
        const dataJSON = await res.json();

        this.setState({ data: dataJSON.Search, loading: false});
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        if(!this.state.serchTerm) {
            this.setState({ loading: false });
            return this.setState({ error: "Por Favor Ingrese Algo" });
        }

        const res = await fetch(`${API}&s=${this.state.serchTerm}`);
        const dataJSON = await res.json();

        if(!dataJSON.Search){
            this.setState({ loading: false });
            return this.setState({ error: "No Hemos Encontrado Datos Relacionados" });
        }

        this.setState({ error: "", serchTerm: "" });
        this.setState({ data: dataJSON.Search, loading: false});
    }

    render() {
        const { data, loading } = this.state;

        if(loading) {
            return <h3 className="text-light">Cargando...</h3>
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 offset-md-4 p-4">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input
                                onChange={e => this.setState({serchTerm: e.target.value})}
                                className="form-control" type="text"
                                name="search" id="search" placeholder="Buscar"
                                value={this.state.serchTerm}
                                autoFocus
                            />
                        </form>
                        <p className="text-white">{ this.state.error ? this.state.error : ""}</p>
                    </div>
                </div>
                <div className="row">
                    {
                        data.map((movie) => {
                            return <Card key={movie.imdbID} movie={movie} />;
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default List;
