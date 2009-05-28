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
import intient.nimble.service.AdminsService

/**
 * Filter that works with Nimble security model to protect controllers, actions, views
 *
 * @author Bradley Beddoes
 */
public class NimbleSecurityFilters extends intient.nimble.security.NimbleFilterBase {

  def filters = {

    login(controller: "(main)") {
      before = {
        accessControl {
          true
        }
      }
    }

   // This should be extended as the application adds more administrative functionality
    administration(controller: "(admins|user|group|role)") {
      before = {
        accessControl {
          role(AdminsService.ADMIN_ROLE)
        }
      }
    }

  }

}