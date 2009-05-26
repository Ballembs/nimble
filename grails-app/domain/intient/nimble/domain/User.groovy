/*
 *  Nimble, an extensive application base for Grails
 *  Copyright (C) 2009 Intient Pty Ltd
 *
 *  Open Source Use - GNU Affero General Public License, version 3
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  Commercial/Private Use
 *
 *  You may purchase a commercial version of this software which
 *  frees you from all restrictions of the AGPL by visiting
 *  http://intient.com/products/nimble/licenses
 *
 *  If you have purchased a commercial version of this software it is licensed
 *  to you under the terms of your agreement made with Intient Pty Ltd.
 */
package intient.nimble.domain

import intient.nimble.domain.LoginHost
import intient.nimble.domain.Permission
import intient.nimble.domain.Role
import intient.nimble.domain._Group

/**
 * Represents a user within a Nimble Application
 *
 * @author Bradley Beddoes
 */
class User extends PermissionAware {

  String username
  String passwordHash
  String actionHash

  boolean enabled
  boolean external
  boolean federated
  boolean remoteapi = false

  Date lastLoginTime
  Date lastFailedLoginTime
  Date expirationTime

  FederationProvider federationProvider
  Profile profile

  static belongsTo = [_Group]

  static hasMany = [
          roles: Role,
          groups: _Group,
          passwdHistory: String,
          loginHosts: LoginHost
  ]

  static fetchMode = [
          roles: 'eager'
  ]

  static mapping = {
    cache usage: 'read-write', include: 'all'

    roles cache: true, cascade: 'none'
    groups cache: true, cascade: 'none'
    permissions cache: true, cascade: 'none'
  }

  static constraints = {
    username(nullable: false, blank: false, unique: true, size: 4..2048)
    passwordHash(nullable: true, blank: true)
    actionHash(nullable: true, blank: true)

    lastLoginTime(nullable: true, blank: true)
    lastFailedLoginTime(nullable: true, blank: true)
    expirationTime(nullable: true, blank: true)

    federationProvider(nullable: true)
  }

// Transients
  static transients = ['pass', 'passConfirm']
  String pass
  String passConfirm

}
