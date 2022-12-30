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
    console.log("p1 = " + p1)
    console.log("p2 = " + p2)
    console.log("p3 = " + p3)
    console.log("ab = " + ab)
    const bc = dist(p2, p3);
    const ac = dist(p1, p3);

    const angle = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / 
(2 * ab * bc);
console.log("an =" +Math.acos(angle))
    return Math.acos(angle) * (180/Math.PI)
}  


function angle_left_elbow(wrist,elbow,shoulder){
    return find_angle(wrist,elbow,shoulder)
    // Function to find the distance between 2 points in a 3D plane
    

}
export function angles(body){
    
    var left_sholder = null
    var left_elbow = null
    var left_wrist = null

        for (let j in body){
            let item = body[j]
            if(item.part == 'left_shoulder') {
                console.log("left_sholder!")
                left_sholder = item
            }
            else if(item.part == 'left_elbow') {
                console.log("left_elbow!")
                left_elbow = item
            }
            else if(item.part == 'left_wrist') {
                console.log("left_wrist!")
                left_wrist = item
            }
        }
    if(left_elbow == null || left_sholder == null || left_wrist == null){
        
    }
        
    else{
        console.log("vector time!")
        // var res = normalize(left_elbow, left_sholder, left_wrist)
        // left_elbow = res[0]
        // left_sholder = res[1]
        // left_wrist = res[2]
        // var sholder_vec = vec3.vec3.fromValues(left_sholder.x,left_sholder.y,left_sholder.z)
        // var wrist_vec = vec3.vec3.fromValues(left_wrist.x,left_wrist.y,left_wrist.z)
        // var angle = vec3.vec3.angle(wrist_vec,sholder_vec) * (180/Math.PI)
        const angle = angle_left_elbow([left_wrist.x,left_wrist.y,left_wrist.z],[left_elbow.x,left_elbow.y,left_elbow.z],[left_sholder.x,left_sholder.y,left_sholder.z])
        return angle;
        

        
    }

}