// elbow, shoulder, knee, hip   
// export const anglesNum = process.env.anglesNum;
// export const anglesSet = process.env.angles;
import fs from 'fs'

var anglesJson = {
    table:[]
};

function dist(p1, p2) {
    return Math.sqrt(
        Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2) +
        Math.pow(p1[2] - p2[2], 2)
    ); 
}

// Function to find the angle in 3D space
function find_angle(p1, p2, p3) {
    const ab = dist(p1, p2);
    const bc = dist(p2, p3);
    const ac = dist(p1, p3);

    const angle = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc);
    return Math.acos(angle) * (180/Math.PI)
}  


function calculate_angle(name,points){
    if(points[0] == null || points[1] == null || points[2] == null){
        return -1;
    }
    console.log("in calc");
    const angle = find_angle(points[0],points[1],points[2]);
    console.log("angle = "+angle);
    anglesJson.table.push({name: name ,angle: angle});

}

export function angles(body){
    var anglesMap = new Map();
   

    var left_shoulder = null
    var left_elbow = null
    var left_wrist = null
    var left_hip = null
    var left_knee = null
    var left_ankle = null

    var right_shoulder = null
    var right_elbow = null
    var right_wrist = null
    var right_hip = null
    var right_knee = null
    var right_ankle = null

    anglesMap.set('leftElbow',[left_wrist,left_elbow,left_shoulder])

        for (let j in body){
            let item = body[j]
            
            switch(item.part){
                case 'left_shoulder':
                    console.log("left shiulder")
                    left_shoulder = [item.x,item.y,item.z];
                    break;
                case 'left_elbow':
                    console.log("left shiulder")
                    left_elbow = [item.x,item.y,item.z];
                    break;
                case 'left_wrist':
                    console.log("left shiulder")
                    left_wrist = [item.x,item.y,item.z];
                    break;
                case 'left_hip':
                    left_hip = [item.x,item.y,item.z];
                    break;
                case 'left_knee':
                    left_knee = [item.x,item.y,item.z];
                    break;
                case 'left_ankle':
                    left_ankle = [item.x,item.y,item.z];
                    break;
                case 'right_shoulder':
                    right_shoulder = [item.x,item.y,item.z];
                    break;
                case 'right_elbow':
                    right_elbow = [item.x,item.y,item.z];
                    break;
                case 'right_wrist':
                    right_wrist = [item.x,item.y,item.z];
                    break;
                case 'right_hip':
                    right_hip = [item.x,item.y,item.z];
                    break;
                case 'right_knee':
                    right_knee = [item.x,item.y,item.z];
                    break;
                case 'right_ankle':
                    right_ankle = [item.x,item.y,item.z];
                    break;
                default:
                    break;
            }
        }
        anglesMap.set('leftElbow',[left_wrist,left_elbow,left_shoulder])
        console.log(anglesMap)
        for (const i of anglesMap.keys()){
            console.log("calculate");
            calculate_angle(i,anglesMap.get(i))
        }
        var json = JSON.stringify(anglesJson);
        fs.writeFile('body_angles.json', json, 'utf8',(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              console.log("The written has the following contents:");
            //   console.log(fs.readFileSync("b.txt", "utf8"));
            }});

        
    
        
        // console.log("vector time!")
        // var res = normalize(left_elbow, left_sholder, left_wrist)
        // left_elbow = res[0]
        // left_sholder = res[1]
        // left_wrist = res[2]
        // var sholder_vec = vec3.vec3.fromValues(left_sholder.x,left_sholder.y,left_sholder.z)
        // var wrist_vec = vec3.vec3.fromValues(left_wrist.x,left_wrist.y,left_wrist.z)
        // var angle = vec3.vec3.angle(wrist_vec,sholder_vec) * (180/Math.PI)
        // const wrist = [left_wrist.x,left_wrist.y,left_wrist.z];
        // const elbow = [left_elbow.x,left_elbow.y,left_elbow.z];
        // const shoulder = [left_sholder.x,left_sholder.y,left_sholder.z];
        
}