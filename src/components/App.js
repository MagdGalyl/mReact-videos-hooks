import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import youtube from "../api/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    onTermSubmit('lol');
    // return () => {
    // }
  }, []);

  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
        params: {
          q : term,
        }
    });

    setVideos(response.data.items)
    setSelectedVideo(response.data.items[0])
  }

  const onVideoSelect = (video) => {
    setSelectedVideo(video)
  };

  return (
    <div className = "ui container ">
      <SearchBar onFormSubmit={onTermSubmit} />

      <div className="ui grid">
          <div className="ui two column row">
              <div className="elven wide column">
                  <VideoDetail video={selectedVideo}/>
              </div>
              
              <div className="five wide column">
                  <VideoList 
                  onVideoSelect={onVideoSelect} 
                  videos = {videos} 
                  />
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;

// class App extends React.Component {
    // state = { videos: [], selectedVideo: null };

    // componentDidMount() { this.onTermSubmit('LoL') }

    // onTermSubmit = async (term) => {
    //     const response = await youtube.get('/search', {
    //         params: {
    //           q : term,
    //         }
    //     })

    //     this.setState({ 
    //         videos: response.data.items,
    //         selectedVideo: response.data.items[0],
    //     });
    // }

    // onVideoSelect = (video) => {
    //     console.log("From the App!", video);
    //     this.setState ({selectedVideo: video })
    //   };

//     render(){
//         return(
//             <div className = "ui container ">
//                 <SearchBar onFormSubmit={this.onTermSubmit} />

//                 <div className="ui grid">
//                     <div className="ui two column row">
//                         <div className="elven wide column">
//                             <VideoDetail video={this.state.selectedVideo}/>
//                         </div>
                        
//                         <div className="five wide column">
//                             <VideoList 
//                             onVideoSelect={this.onVideoSelect} 
//                             videos = {this.state.videos} 
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default App;