

class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state ={n: 1}
        this.timer = null
    }
    componentDidMount(){
        this.timer = window.setInterval(this.increment.bind(this),1000)
    }
    componentWillUnmount(){
        window.clearInterval(this.timer)
    }
    increment(){
        this.setState({n: this.state.n + 1})
    }


    render(){
    return <div>compteur : {this.state.n}</div>
    }
}

class SimpleCanvas extends React.Component{
    componentDidMount() {
        //console.log(this.refs.canvas)
        const canvas = this.refs.canvas

        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
    
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(10, 10, 50, 50);
    
            ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            ctx.fillRect(30, 30, 50, 50);
          }
        // const img = this.refs.image
    }


    render(){
        return <div>
            <canvas ref = 'canvas' id="canvas" width ='200' height ='100'></canvas>

        </div>
    }
}
class P5Canvas extends React.Component{
    constructor(props){
        super(props)

        this.myRef = React.createRef() // ne pas oublier d'appeler .current
        this.state = {color: Math.random()*255, strokeColor: Math.random()*255}
        this.randomColor = this.randomColor.bind(this) // a binder sinon on perd le contexte
    }
    randomColor(){
        this.setState({color:[Math.random()*255, Math.random()*255, Math.random()*255]})
        this.setState({strokeColor:[Math.random()*255, Math.random()*255, Math.random()*255]})
    }
    
    Sketch = (p)=>{
        let x = 20
        let y = 2
        
        p.setup = ()=>{
            p.createCanvas(200, 200);
        }
        p.draw = ()=>{
            p.background(0);
            p.fill(this.state.color);
            p.stroke(this.state.strokeColor)
            p.strokeWeight(4);
            p.rect(x,y,50,50);
        }
    }
    componentDidMount(){
        this.myP5 = new p5(this.Sketch, this.myRef.current, this.state.color, this.state.strokeColor)
    }
    render(){
        return <div id = 'canvas'>
            <button onClick = {this.randomColor}>random color</button>
            <div ref ={this.myRef} color = {this.state.color}></div>
        </div>
    }
}
class THREECanvas extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      // document.body.appendChild( renderer.domElement );
      // use ref as a mount point of the Three.js scene instead of the document.body
      this.mount.appendChild( renderer.domElement );
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      camera.position.z = 5;
      var animate = function () {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
      };
      animate();
    }
    render() {
      return (
          <div> this is three.js
              <div ref={ref => (this.mount = ref)} />
          </div>
      )
    }
  }

function MyApp(props){

    return <div>
        <P5Canvas color={150,10,10} strokeColor ={125} />
        Bonjour tous le monde il est : <Timer start = {0}/>
        <SimpleCanvas/>
        <P5Canvas color={10,150,10} strokeColor = {255}/>
        <THREECanvas/>
    </div>
}

const rootElement = document.getElementById('app')

ReactDOM.render(<MyApp></MyApp>, rootElement );