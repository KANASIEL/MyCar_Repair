package com.boot.service;

public interface AdminService {

    public boolean upgradeToAdmin(String loginId, String adminKey);
    public void downgradeToUser(String accountId);
}