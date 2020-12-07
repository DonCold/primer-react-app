import React, { Fragment } from "react";

import Card from "./../components/Card/Card";

const API = "http://www.omdbapi.com/?i=tt3896198&apikey=d2d46260";

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            serchTerm: "kimetsu",
            error : ""
        };
    }

    async componentDidMount() {
        const res = await fetch(`${API}&s=${this.state.serchTerm}`);
        const dataJSON = await res.json();

        this.setState({ data: dataJSON.Search });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if(!this.state.serchTerm) {
            return this.setState({ error: "Por Favor Ingrese Algo" });
        }

        const res = await fetch(`${API}&s=${this.state.serchTerm}`);
        const dataJSON = await res.json();
        if(!dataJSON.Search){
            return this.setState({ error: "No Hemos Encontrado Datos Relacionados" });
        }
        this.setState({ error: "", serchTerm: "" });
        this.setState({ data: dataJSON.Search });
    }

    render() {
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
                    {this.state.data.map((movie) => {
                        return <Card key={movie.imdbID} movie={movie} />;
                    })}
                </div>
            </Fragment>
        );
    }
}

export default List;
