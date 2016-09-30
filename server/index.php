<?php

class API {
  private $method;
  private $dataUri;

  public function __construct()
  {
    $get = filter_input_array(INPUT_GET, array('method' => FILTER_SANITIZE_STRING));
    $post = filter_input_array(INPUT_POST, array('dataUri' => FILTER_SANITIZE_STRING));

    $this->method = $get['method'];
    $this->dataUri = $post['dataUri'];
  }

  public function run()
  {
    if (in_array($this->method, array('imageRecognition'))) {
      $result = array('data' => $this->{$this->method}());
    } else {
      $result = array('data' => NULL, 'message' => 'invalid method');
    }

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($result);
  }

  private function imageRecognition()
  {

    $imgData = str_replace(' ','+',$this->dataUri);
    $imgData =  substr($imgData,strpos($imgData,",")+1);
    $imgData = base64_decode($imgData);
    $path = 'tensorflow/tmp/file.jpg';
    $file = fopen($path, 'w');
    fwrite($file, $imgData);
    fclose($file);

    $output = shell_exec('python.sh');
    $myfile = fopen("tensorflow/python_output", "r") or die("Unable to open file!");
    $data = fread($myfile,filesize('tensorflow/python_output'));
    fclose($myfile);
    $data = explode('%', $data);

    $return = array();
    foreach ($data as $item) {
      if ($item !== '') {
        $return[] = $item;
      }
    }

    return $return;
  }

}

$api = new API();
$api->run();
