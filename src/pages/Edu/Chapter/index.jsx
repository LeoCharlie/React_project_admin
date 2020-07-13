import React, { Component } from 'react';
import List from "./components/List";
import Search from "./components/Search";
class Chapter extends Component {
    render() {
        return (
            <div>
                <Search></Search>
                <List></List>
            </div>
        );
    }
}

export default Chapter;