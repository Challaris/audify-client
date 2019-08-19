import React, { Component, useEffect, useState } from 'react';
import highImage from './images/high.png';
import searchImage from './images/search.png';
import metrics from './images/metrics.svg';
import background from './images/background.png';
import { ReactComponent as Spinner } from './spinner.svg';
import Modal from 'react-modal';
import axios from 'axios';
import URLNormailzer from 'normalize-url';
import ContentLoader from 'react-content-loader';

const customStyles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

Modal.setAppElement(document.querySelector('#modal'));

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      url: '',
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.URLInput = React.createRef();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  componentDidMount() {
    this.URLInput.current.focus();
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Audit url={this.state.url} />
        </Modal>
        <div>
          <header className="flex p-2 items-center shadow border-b-1 px-5 border-gray-400">
            <div className="h-10 bg-blue-900 p-1 w-24  rounded" />
            <ul className="ml-auto flex mr-5">
              <li className="mr-5 text-xl">
                <a
                  href="https://www.google.com"
                  className="hover:text-primary hover:text-bold"
                >
                  Store
                </a>
              </li>
              <li className="text-xl">
                <a
                  href="https://www.github.com/charisol/coppily"
                  className="hover:text-primary hover:text-bold"
                >
                  Feedback
                </a>
              </li>
            </ul>
          </header>
          {/* Top */}
          <div
            style={{ backgroundImage: `url(${background})` }}
            className="bg-purple-900 flex relative bg-contain"
          >
            <div className="flex flex-col text-white p-10 w-full md:w-2/3 md:p-20">
              <h4 className="font-light ml-2">BY CHARSIOL</h4>
              <h1 className="text-5xl leading-tight">
                Audit Your Website in <br />
                <span className="font-bold text-6xl">Seconds</span>
              </h1>
              <form
                className="py-5 pb-1 flex"
                onSubmit={e => e.preventDefault()}
              >
                <input
                  ref={this.URLInput}
                  value={this.state.url}
                  className="h-12 rounded flex-1 mr-2 text-gray-900 px-5 text-lg"
                  placeholder="www.mywebsite.com"
                  onChange={e => this.setState({ url: e.target.value })}
                />
                <button
                  disabled={!this.state.url}
                  onClick={this.openModal}
                  className="h-12 rounded-full bg-white text-purple-900 px-5 font-bold mx-2"
                >
                  LETS DO THIS
                </button>
              </form>
              <p className="font-bold">This doesn't look like a valid URL</p>
            </div>
          </div>

          <section className="">
            <div className="flex flex-wrap overflow-hidden p-5 my-10">
              {/* Item */}
              <div className="w-full overflow-hidden text-white sm:w-1/2 p-3">
                <div className="p-5 bg-blue-900 rounded-lg">
                  <img src={searchImage} className="h-48" />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-purple-900">SEO</h4>
                    <h1 className="text-xl font-bold">
                      How optimized is your <br />
                      website for search engines
                    </h1>
                    <button className="h-12 rounded bg-white text-purple-900 px-5 font-bold">
                      LETS DO THIS
                    </button>
                  </div>
                </div>
              </div>

              {/* Item */}
              <div className="w-full overflow-hidden  text-white sm:w-1/2 p-3">
                <div className="p-5 bg-purple-900 rounded-lg">
                  <img src={highImage} className="h-48" />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-purple-900">SEO</h4>
                    <h1 className="text-xl font-bold">
                      How optimized is your <br />
                      website for search engines
                    </h1>
                    <button className="h-12 rounded bg-white text-purple-900 px-5 font-bold mx-2">
                      LETS DO THIS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;

function Audit({ url }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // React.useEffect(() => {
  //   const normailzedURL = URLNormailzer(url);
  //   axios
  //     .get(`https://audify-server.herokuapp.com/audit?url=${normailzedURL}`)
  //     .then(results => {
  //       console.log(results);
  //       setResults(results);
  //       setIsLoading(results);
  //     });
  // }, [setResults, setIsLoading, url]);

  return (
    <div className="flex h-full w-full  flex-col">
      {/* <h1 className="text-3xl text-center my-10 text-gray-900">
        Stay calm while i crunch the latest data for <br />
        <span className="p-2 bg-purple-200 rounded-full">www.github.com</span>
      </h1>
      // {isLoading && <Spinner />}
      <pre>{JSON.stringify(results)}</pre> */}

      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-red-200" />
        <div>
          <h4 className="font-bold">PROGRESSIVE WEB APP TEST</h4>
          <h3>Test Failed</h3>
          <p>The users can get a better experience if ...</p>
        </div>
      </div>
    </div>
  );
}
