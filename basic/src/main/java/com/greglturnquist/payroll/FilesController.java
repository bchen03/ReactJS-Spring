package com.greglturnquist.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Benny on 1/20/2018.
 */
@RestController
public class FilesController {

    @Autowired
    Environment environment;

    @RequestMapping("/api/files")
    public List<String> getFiles() {
        List<String> files = new ArrayList<>();
        files.add("http://localhost:8080/files/test.html");
        files.add("http://localhost:8080/files/test2.html");
        return files;
    }

}
