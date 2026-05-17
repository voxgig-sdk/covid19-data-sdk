<?php
declare(strict_types=1);

// Covid19Data SDK configuration

class Covid19DataConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Covid19Data",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://disease.sh/v3/covid-19",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "all" => [],
                    "historical" => [],
                ],
            ],
            "entity" => [
        'all' => [
          'fields' => [
            [
              'name' => 'case',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'death',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'recovered',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 2,
            ],
          ],
          'name' => 'all',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'all',
                        'kind' => 'query',
                        'name' => 'lastday',
                        'orig' => 'lastday',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/historical/all',
                  'parts' => [
                    'historical',
                    'all',
                  ],
                  'select' => [
                    'exist' => [
                      'lastday',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'historical' => [
          'fields' => [
            [
              'name' => 'country',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'province',
              'req' => false,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'timeline',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 2,
            ],
          ],
          'name' => 'historical',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'USA',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'country',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'all',
                        'kind' => 'query',
                        'name' => 'lastday',
                        'orig' => 'lastday',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/historical/{country}',
                  'parts' => [
                    'historical',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'country' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'lastday',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return Covid19DataFeatures::make_feature($name);
    }
}
