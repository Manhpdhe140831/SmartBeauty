package com.swp.sbeauty.validation;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;

import java.util.regex.Pattern;

public class ValidInputDto {
    public String validUser(UserDto userDto){
        String result = "";
        if(userDto.getName().length() < 3) {
            result += "User name should have at least 3 characters\n";
        }
        Pattern p = Pattern.compile("^[a-zA-Z][a-zA-Z0-9]+@[a-zA-Z]+(\\.[a-zA-Z]+){1,3}$");
        if(!p.matcher(userDto.getEmail()).find()){
            result += "Email is not valid\n";
        }
        if(userDto.getEmail() == null){
            result+= "Email is not empty\n";
        }
        Pattern p1 = Pattern.compile("^[0-9]{10,11}$");
        if(!p1.matcher(userDto.getPhone()).find()){
            result += "Phone is not valid\n";
        }
        if(userDto.getPhone() == null){
            result+= "Phone is not empty\n";
        }
        return result;
    }
    public String validBranch(BranchDto branchDto){
        String result = "";
        if(branchDto.getName().length() < 3) {
            result += "Branch name should have at least 3 characters";
        }
        Pattern p1 = Pattern.compile("^[0-9]{10,11}$");
        if(!p1.matcher(branchDto.getPhone()).find()){
            result += "Phone is not valid";
        }
        if(branchDto.getPhone() == null){
            result+= "Phone is not empty";
        }
        if(branchDto.getAddress() == null){
            result+= "Address is not empty";
        }
        return result;
    }
}
