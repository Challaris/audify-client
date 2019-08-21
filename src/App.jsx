import React, { Component, useEffect, useState } from 'react';
import highImage from './images/high.png';
import searchImage from './images/search.png';
import metrics from './images/metrics.svg';
import background from './images/background.png';
import Modal from 'react-modal';
import axios from 'axios';
import URLNormailzer from 'normalize-url';
import { XCircle, CheckCircle, Smartphone, Type, Globe } from 'react-feather';
import { useTransition, animated } from 'react-spring';

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
      url: 'https://kentcdodds.com',
      modalIsOpen: false,
      results: [],
      isLoading: false,
      error: '',
      networkError: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.URLInput = React.createRef();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  audit = () => {
    const normailzedURL = URLNormailzer(this.state.url);
    this.setState({ isLoading: true, networkError: false });
    axios
      .get(`https://audify-server.herokuapp.com/audit?url=${normailzedURL}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({ results: data, isLoading: false });

        this.openModal();
      })
      .catch(() => {
        this.setState({ isLoading: false, networkError: true });
      });
  };
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
    const {
      url,
      modalIsOpen,
      results,
      isLoading,
      error,
      networkError
    } = this.state;
    const { closeModal, URLInput, audit, afterOpenModal } = this;
    return (
      <>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Audit results={results} />
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
            <div className="flex flex-col text-white p-10 md:p-20 w-full">
              <div className="flex flex-col text-white w-full md:w-2/3 ">
                <h4 className="font-light ml-2">BY CHARSIOL</h4>
                <h1 className="text-5xl leading-tight">
                  Audit Your Website in <br />
                  <span className="font-bold text-6xl">Seconds</span>
                </h1>
              </div>
              <form
                className="py-5 pb-1 flex w-full flex-wrap"
                onSubmit={e => e.preventDefault()}
              >
                <div className="w-full sm:w-1/2 sm:mr-5 mb-5 sm:mb-0">
                  <div className="h-12 items-center flex rounded mr-2 text-gray-900 px-5 text-lg w-full bg-white">
                    <Globe className="text-gray-800" />
                    <input
                      ref={URLInput}
                      value={url}
                      spellCheck={false}
                      placeholder="www.mywebsite.com"
                      className="ml-5"
                      onChange={e =>
                        this.setState({
                          url: e.target.value,
                          error: e.target.value.length > 0 ? '' : error
                        })
                      }
                      onBlur={() =>
                        url.length === 0 &&
                        this.setState({
                          error:
                            'You should supply a URL for this test to beigin'
                        })
                      }
                    />
                  </div>

                  {error && (
                    <p className="font-light mt-1 text-red-500">
                      You should supply a URL for this test to beigin
                    </p>
                  )}

                  {networkError && (
                    <p className="font-light mt-1 text-lg text-red-500">
                      An error occured, plase try again
                    </p>
                  )}
                </div>
                <div className="w-full sm:flex-1">
                  <button
                    onClick={audit}
                    disabled={!url.trim() || isLoading}
                    className="disabled:text-gray-300 flex justify-center items-center h-12 w-full sm:w-auto rounded bg-white text-purple-900 px-5 font-bold "
                  >
                    {(isLoading && (
                      <div className="lds-ellipsis">
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    )) ||
                      'LETS DO THIS'}
                  </button>
                </div>
              </form>
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
                    <button className="h-12  rounded bg-white text-purple-900 px-5 font-bold">
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
                      Get to know where you stand<br />
                      in few seconds
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
      </>
    );
  }
}

export default App;

function Audit({ results }) {
  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <div className="h-full w-full">
      <Test
        title="HTTPS TEST"
        score={results['is_on_https'].score}
        details={results['is_on_https'].description}
      />

      <Test
        title="FONT SIZE TEST"
        score={results['font_size'].score}
        details={results['font_size'].description}
      />

      <Test
        title="CRAWLABILITY TEST"
        score={results['is_crawlable'].score}
        details={
          'Checks if Google and other search engines can index your website properly'
        }
      />

      <Test
        title="FIRST CONTENTFUL PAINT TEST"
        score={results['first_contentful_paint'].score > 0.5 ? 1 : 0}
        details={
          'First Contentful Paint marks the time at which the first text or image is displayed'
        }
      />

      <Test
        title="PROGRESSIVE WEB APP TEST"
        score={
          results['installable_manifest'].score == 1 &&
          results['works_offline'].score == 1
        }
        details={
          'Progressive web apps provide offline support and mobile app like exppericence for users'
        }
      />
    </div>
  );
}

function Test({ title, score, details }) {
  return (
    <div className="flex items-center p-5">
      {/* <div className="rounded-full shadow flex items-center justify-center h-10 w-10 bg-red-500"><Smartphone color="white" /></div> */}
      <div className="pl-2">
        <h4 className="font-bold text-lg text-blue-700">{title}</h4>
        <p className="flex text-lg font-bold">
          {(!score && (
            <>
              <XCircle color="red" className="mr-1" />
              Test Failed
            </>
          )) || (
            <>
              <CheckCircle color="green" className="mr-1" />
              Test Passed
            </>
          )}
        </p>
        <p style={{ wordBreak: 'break-word' }}>{details}</p>
      </div>
    </div>
  );
}
