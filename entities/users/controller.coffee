module.exports = (app, config, referTeammates) ->

  # Model and Config
  User = require('./model')

  auth = (req, res, next) ->
    unauthorized = (res) ->
      res.set 'WWW-Authenticate', 'Basic realm=Authorization Required'
      return res.sendStatus 401

    user = require('basic-auth')(req)

    return unauthorized res if (!user || !user.name || !user.pass)
    return next() if (user.name == config.ADMIN_USER && \
      user.pass == config.ADMIN_PASS)
    return unauthorized res

  checkinAuth = (req, res, next) ->
    unauthorized = (res) ->
      res.set 'WWW-Authenticate', 'Basic realm=Checkin Authorization Required'
      return res.sendStatus 401

    user = require('basic-auth')(req)

    return unauthorized res if (!user || !user.name || !user.pass)
    return next() if (user.name == config.CHECKIN_USER && \
      user.pass == config.CHECKIN_PASS)
    return unauthorized res
    
  # Index

  # Admin
  app.get "/users/admin", auth, (req, res, next) ->
    User.find({ deleted: { $ne: true } }).sort({ createdAt: -1 })\
    .exec (err, users) ->
      statuses = {}
      (if statuses[user.status]
        statuses[user.status]++
      else
        statuses[user.status] = 1) for user in users
      res.render("entity_views/users/admin.jade", \
        { users: users, statusCounts: statuses })

  app.get "/users/admin/waitlist", auth, (req, res, next) ->
    User.find({ deleted: { $ne: true }, status: "Waitlisted" })\
    .sort({ createdAt: 1 }).exec (err, users) ->
      res.render("entity_views/users/waitlist.jade", { users: users })

  app.get "/users/admin/checkin", checkinAuth, (req, res, next) ->
    User.find({ deleted: { $ne: true }, status: "Confirmed" })\
    .exec (err, users) ->
      res.render("entity_views/users/checkin.jade", { users: users })

  app.post "/users/admin/checkin", checkinAuth, (req, res, next) ->
    User.update({ email: req.body.email }, { $set: { "checkedIn": true } })\
    .exec (err) ->
      return res.json({ "error": true }) if err
      res.json { "success": true }

  # Show
  app.get '/users/:id', (req, res) ->
    User.findById(req.params.id, (e, user) ->
      if e or user is null
        res.redirect '/'
      res.render 'entity_views/users/show', { user: user }
    )

  # Destroy

  app.get '/users/:id/delete', auth, (req, res) ->
    User.findById(req.params.id, (e, user) ->
      if e
        res.status 400
        res.json { 'error': 'User not found' }
      user.softdelete (err, newUser) ->
        newUser.save()
        res.json { 'success': true }
    )

  app.get '/users/:id/unwaitlist', auth, (req, res) ->
    User.findById(req.params.id, (e, user) ->
      if e
        res.status 400
        res.json { 'error': 'User not found' }
      user.status = "Unconfirmed" if user.status == "Waitlisted"
      user.save()
      res.json { 'success': true }
    )

  # Edit
  app.post '/users/:id/edit', (req, res) ->
    trackEdit = (user, field, from, to) ->
      console.log('/users/edit: User "' + user.firstName + ' ' + user.lastName +
        '" changed field "' + field + ' from "' +
        from + '" to "' + to + '"')
    User.findById(req.params.id, (e, user) ->
      if e or user is null
        res.status 400
        return res.json { 'error': 'User not found' }
      if !req.body.id
        res.status 500
        return res.json { 'error': 'Something went wrong in the request' }
      
      # Make rules for certain fields
      originalValue = req.body.value
      sendReferral = false

      # Teammates
      if req.body.id.indexOf('teammate') == 0
        teammateId = req.body.id.slice -1
        trackEdit(user, req.body.id, user.teammates[teammateId], req.body.value)
        # Ensure they're not adding a new email
        if user.teammates[teammateId] is undefined
          user.teammates.push req.body.value
        else
          user.teammates[teammateId] = req.body.value
        user.markModified 'teammates'
        sendReferral = true

      else if req.body.id == 'major'
        trackEdit(user, 'majors', user.majors, req.body.value)
        user.majors = [req.body.value]
      else if req.body.id == 'travel'
        user.travel.outOfState = (req.body.value != 'San Diego')
        trackEdit(user, 'city', user.travel.city, req.body.value)
        user.travel.city = req.body.value
      else
        trackEdit(user, req.body.id, user[req.body.id], req.body.value)
        user[req.body.id] = req.body.value

      user.save (err) ->
        if err
          res.status 500
          console.error 'Error editing user data'
          return res.json { 'error': 'Something went wrong in the database' }

        if sendReferral
          referTeammates user, req
        res.send originalValue
    )

  app.get '/users/:id/accept', (req, res) ->
    User.findById(req.params.id, (e, user) ->
      if e or user is null
        return res.redirect '/'
      
      if user.status != "Unconfirmed" and user.status != "Waitlisted" and \
      user.status != "Confirmed"
        console.error 'Someone has tried to edit their status'
        return res.json { 'error': true }

      if req.query.status == "false"
        user.status = "Declined"
      else
        user.status = "Confirmed"
        user.bussing = true if req.query.bus and req.query.bus == "true"

      user.save()

      res.json { 'success': true }
    )