package com.tplinkdns.ysy.ytd.repository;

import com.tplinkdns.ysy.ytd.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {


    @EntityGraph(attributePaths = {"userRoleList"})
    @Query("select u from User u where u.email = :email")
    User getWithRoles(@Param("email") String email);

    Boolean existsByEmail(String email);

    Boolean existsByNickName(String nickName);
}
