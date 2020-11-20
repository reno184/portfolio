
package{
	
	import flash.events.Event;
	import flash.events.ProgressEvent;
	import flash.events.MouseEvent;
	import flash.display.*;
	import flash.ui.*;
	
	import flash.display.Loader;
	import flash.net.URLRequest;
	

	import org.papervision3d.render.BasicRenderEngine;
	import org.papervision3d.view.Viewport3D;
	import org.papervision3d.scenes.Scene3D; 
	import org.papervision3d.cameras.Camera3D;
	import  org.papervision3d.objects.primitives.Sphere;
	import  org.papervision3d.materials.MovieMaterial;

	public class main extends MovieClip{
	
	private var render:BasicRenderEngine;
	private var view:Viewport3D;
	private var scene:Scene3D;
	private var cam:Camera3D;
	private var l:Loader;
	private var t:MovieClip;
	private var h:MovieClip;
	private var vitesse:Number=2;
		public function main():void{
			
			h=loader_mc;
			t=click_ici;
			t.visible=false;
			l = new Loader();
			l.load(new URLRequest("content/pano/test.jpg"));
			
			l.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS,chargementENCOURS);
			l.contentLoaderInfo.addEventListener(Event.COMPLETE,init);
			
			
		}
		
		private function init(e:Event) : void{
			
			t.visible=true;
			t.addEventListener(MouseEvent.MOUSE_DOWN,placeElement);			
		}
		
		private function placeElement(e:Event) : void{
			h.visible=false;
			
			render = new BasicRenderEngine();
			view = new Viewport3D(stage.stageWidth,stage.stageHeight);
			scene = new Scene3D();
			cam = new Camera3D();
			
			addChild(view);
						
			setDecor();
		}
		
		private function chargementENCOURS(evt:Event):void{
		
		var valeurPourcentage:Number =(evt.currentTarget.bytesLoaded / evt.currentTarget.bytesTotal);
		var n:Number = Math.ceil(valeurPourcentage*100);
				
		h.gotoAndStop(n);
		
		}
		
		 
	
		
		private function setDecor() : void{
			var texture = new MovieMaterial(l);
			texture.doubleSided=true;
			
			var sphere = new Sphere(texture,100,20,20);
			sphere.x=sphere.y=sphere.z=0;
			cam.x=cam.y=cam.z=0;
			cam.rotationY=0;
			cam.rotationX=0;
			scene.addChild(sphere);
			addEventListener(Event.ENTER_FRAME,anim);									
			addEventListener(MouseEvent.MOUSE_OUT,onMouseOut);
			addEventListener(MouseEvent.MOUSE_OVER,onMouseOver);
			
		}
		
		public function onMouseOver(event:Event)
		{
			addEventListener(Event.ENTER_FRAME,anim);
		}
		
		public function onMouseOut(event:Event)
		{
			removeEventListener(Event.ENTER_FRAME,anim);	
		}
		
		private function anim(e:Event) : void{
		
		var rotY = (stage.mouseX-stage.width/2)/(stage.width/2);
		if(rotY>1 || rotY<-1){rotY=0}
		
		var rotX = (stage.mouseY-stage.height/2)/(stage.height/2);
		if(rotX>1 || rotX<-1){rotX=0}
		
		cam.rotationY +=rotY*vitesse;
		cam.rotationX +=rotX*vitesse;
		
		if(cam.rotationX > 50){cam.rotationX = 50}
		if(cam.rotationX <- 50){cam.rotationX = -50}
		
		rendere();
		
		}
		
		private  function rendere(): void{
		
		render.renderScene(scene,cam,view);
		
		}
		

		
	}
	
}