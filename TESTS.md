# Test Suite

## tests/controllers/poseController.test.js

### Pose controller

#### POST /api/poses/addPose

```
✓ should create a new pose
✓ should avoid create a new pose with the same name
```

#### POST /api/poses/updatePose

```
✓ should update a pose by name
```

#### GET /api/poses/getPose

```
✓ should return a pose by name
✓ should return an error if pose is not found
```

#### GET /api/poses/deletePose

```
✓ should delete a pose by name
✓ should return an error if pose is not found
```

#### GET /api/poses/getAllPoses

```
✓ should return all poses
```



## tests/controllers/scoreController.test.js

### Score controller

#### POST /api/scores/addScore

```
✓ should create a new score
✓ should return an error if user is missing
```

#### GET /api/scores/getSessionScores

```
✓ should return scores by session
✓ should return an empty array if could not found scores
```

#### GET /api/scores/getUserScores

```
✓ should return scores by user email
✓ should return an empty array if could not found scores
```



## tests/controllers/sessionController.test.js

### Session controller

#### POST /api/sessions/addSession

```
✓ should create a new session
✓ should avoid create a new session with the same name
```

#### POST /api/sessions/updateSession

```
✓ should update a session by name
```

#### GET /api/sessions/getSession

```
✓ should return a session by name
✓ should return a 404 error if session is not found
```

#### GET /api/sessions/deleteSession

```
✓ should delete a session by name
✓ should return an error if session is not found
```

#### GET /api/sessions/getAllSessions

```
✓ should return all sessions
```



## tests/controllers/userController.test.js

### User controller

#### POST /api/users/register

```
✓ should create a new user
✓ should return an error if email is missing
```

#### POST /api/users/updateUser

```
✓ should update a user by email
```

#### GET /api/users/getUser

```
✓ should return a user by email
✓ should return a 404 error if user is not found
```

#### GET /api/users/getAllUsers

```
✓ should return all users
```



