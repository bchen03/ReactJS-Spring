package com.greglturnquist.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class FilesController {

    @Autowired
    Environment environment;

    @RequestMapping("/api/files")
    public List<Map<String,String>> getFiles(HttpServletRequest httpServletRequest) throws IOException {

        String filesPath = environment.filesPath.replace("file:///", "").replace("file:", "");
        try (Stream<Path> paths = Files.walk(Paths.get(filesPath)))
        {
            String host = httpServletRequest.getRequestURL().toString().replace("/api/files", "");
            return paths
                    .filter(Files::isRegularFile)
                    .map(file -> buildFileMap(
                        file.getFileName().toString(),
                        host + "/" + environment.urlPath + "/" + file.getFileName().toString()))
                    .collect(Collectors.toList());
        }
    }

    private Map<String, String> buildFileMap(String title, String url) {
        Map<String, String> map = new HashMap<>();
        map.put("title", title);
        map.put("url", url);
        return map;
    }


}
